'use strict';

import fs from 'fs-extra';
import dotenv from 'dotenv';
import notifier from 'mail-notifier';
import { IncomingWebhook } from '@slack/webhook';
import cheerio from 'cheerio';

dotenv.config();
const ENV = process.env;

const webhook = new IncomingWebhook(ENV.SLACK_WEBHOOK_URL);

const imap = {
  user: ENV.USER,
  password: ENV.PASSWORD,
  host: ENV.HOST,
  port: ENV.PORT,
  tls: false,
  tlsOptions: { rejectUnauthorized: false },
};

(async () => {
  const n = notifier(imap);

  n.on('connected', () => console.log(`---connected---`));

  n.on('mail', async (mail) => {
    console.log(`---mail---`);
    fs.writeFileSync('mail.json', JSON.stringify(mail));
    let data = ' _new mail received_\n';

    for (const i of ['from', 'to', 'bcc', 'cc']) {
      let temp = '';
      if (mail[i] === undefined) {
        continue;
      }
      for (const j of mail[i]) {
        temp += `${j.name} ${j.address} / `;
      }
      if (temp != '') {
        data += `> ${i}: ${temp.replace(/ \/ $/, '')}\n`;
      }
    }

    if (mail.subject) {
      data += `*subject: ${mail.subject}* \n`;
    }

    if (mail.date) {
      data += `\`date: ${mail.date}\`\n`;
    }

    let attachments = '';
    if (mail.attachments) {
      for (const i of mail.attachments) {
        attachments += `${i.fileName} / `;
      }
    }
    if (attachments != '') {
      data += `\`attachments: ${attachments.replace(/ \/ $/, '')}\`\n`;
    }
    const text = cheerio.load(mail.html)('body').text();
    if (text != '\n') {
      data += `\`\`\`${text}\`\`\``;
    }

    await webhook.send({
      text: data,
    });
  });

  n.on('error', (error) => {
    console.log(`---error---\n${error}`);
    n.stop();
    n.start();
  });

  n.on('end', () => {
    console.log(`---disconnect---`);
    n.start();
  });

  n.start();
})();
