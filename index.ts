'use strict';

import dotenv from 'dotenv';
import notifier from 'mail-notifier';
import { WebClient } from '@slack/web-api';
import fs from 'fs';
import cheerio from 'cheerio';
import moment from 'moment-timezone';
import HTML5ToPDF from 'html5-to-pdf';
import path from 'path';

dotenv.config();
const ENV = process.env;

const client = new WebClient(ENV.SLACK_BOT_TOKEN);

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
    //fs.writeFileSync('mail.json',JSON.stringify(mail))
    console.log(`---mail---`);
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

    const time = moment(mail.date).tz(ENV.TIMEZONE).format();

    let file;
    let filename;
    try {
      const savePath = path.join(__dirname, `${new Date().getTime()}.pdf`);
      const html5ToPDF = new HTML5ToPDF({
        inputBody: mail.html,
        outputPath: savePath,
      });
      await html5ToPDF.start();
      await html5ToPDF.build();
      await html5ToPDF.close();
      file = fs.readFileSync(savePath);
      fs.unlinkSync(savePath);
      filename = `${time}.pdf`;
    } catch {
      file = fs.readFileSync('Comingsoon.png');
      filename = 'commingsoon.png';
    }

    const response = await client.files.upload({
      channels: '#devneco',
      title: time,
      file,
      filename,
      initial_comment: data,
    });
    response;
    //console.log(response);
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
