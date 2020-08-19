'use strict';

import dotenv from 'dotenv';
import notifier from 'mail-notifier';
import { IncomingWebhook } from '@slack/webhook';
import cheerio from 'cheerio';
//import fs from 'fs';

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
    //fs.writeFileSync('mail.json', JSON.stringify(mail));
    console.log(`---mail---`);
    let data = `:email: ${mail.subject ? `*${mail.subject}*` : ''} \n`;

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

    if (mail.date) {
      data += `:clock2: \`${mail.date}\`\n`;
    }

    let attachments = '';
    if (mail.attachments) {
      for (const i of mail.attachments) {
        attachments += ` \`${i.fileName}\``;
      }
    }
    if (attachments != '') {
      data += `:open_file_folder:${attachments}\n`;
    }

    const $ = cheerio.load(mail.html);

    let linkList = '';
    $('a').each((index, element) => {
      const linkName = element.children[0].data;
      const linkHref = element.attribs.href.replace(/\\"/g, '');
      linkList += `> ${linkName && linkName != linkHref ? `${linkName}: ` : ''}${linkHref}\n`;
    });
    data += linkList === '' ? '' : `:link:\n${linkList}\n`;

    let imgList = '';
    $('img').each((index, element) => {
      const src = element.attribs.src.replace(/\\"/g, '');
      imgList += src.match(/^http/gi) ? `> ${src}\n` : '';
    });
    data += imgList === '' ? '' : `:frame_with_picture:\n${imgList}\n`;

    const text = $('body').text();
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
