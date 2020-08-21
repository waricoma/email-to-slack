'use strict';

import dotenv from 'dotenv';
import notifier from 'mail-notifier';
import { IncomingWebhook } from '@slack/webhook';
import { MailToSlackMsg } from './lib/mail-to-slack-msg';
// import fs from 'fs';

dotenv.config();
const ENV = process.env;

const webhook = new IncomingWebhook(ENV.SLACK_WEBHOOK_URL);

const n = notifier({
  user: ENV.EMAIL,
  password: ENV.PASSWORD,
  host: ENV.HOST,
  port: ENV.PORT,
  tls: false,
  tlsOptions: { rejectUnauthorized: false },
});

n.on('connected', () => console.log(`---connected---`));

n.on('mail', async (mail) => {
  // fs.writeFileSync('mail.json', JSON.stringify(mail));

  await webhook.send({
    text: new MailToSlackMsg({
      from: mail.from,
      to: mail.to,
      cc: mail.cc,
      subject: mail.subject,
      date: mail.date,
      attachments: mail.attachments,
      html: mail.html,
    }).get(),
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
