'use strict';

import { MailToSlackMsg } from '../lib/mail-to-slack-msg';

test('if set the email list of "from", "getSenderAndReceiver" will return it.', () => {
  const mailToSlackMsg = new MailToSlackMsg({
    from: [{ name: 'Taro Yamada', address: 'tyamada@example.com' }, { address: 'hanako@example.com' }],
  });

  expect(mailToSlackMsg.getSenderAndReceiver()).toBe('> from Taro Yamada tyamada@example.com / hanako@example.com');
});

test('if set the email list of "to", "getSenderAndReceiver" will return it.', () => {
  const mailToSlackMsg = new MailToSlackMsg({
    to: [{ name: 'Taro Yamada', address: 'tyamada@example.com' }, { address: 'hanako@example.com' }],
  });

  expect(mailToSlackMsg.getSenderAndReceiver()).toBe('> to Taro Yamada tyamada@example.com / hanako@example.com');
});

test('if set the email list of "cc", "getSenderAndReceiver" will return it.', () => {
  const mailToSlackMsg = new MailToSlackMsg({
    cc: [{ name: 'Taro Yamada', address: 'tyamada@example.com' }, { address: 'hanako@example.com' }],
  });

  expect(mailToSlackMsg.getSenderAndReceiver()).toBe('> cc Taro Yamada tyamada@example.com / hanako@example.com');
});

test('if set the date, "whenThereIsDate" will return it.', () => {
  const date = new Date().toString();
  const mailToSlackMsg = new MailToSlackMsg({ date });

  expect(mailToSlackMsg.whenThereIsDate()).toBe(`:clock2: \`${date}\``);
});

test('if set the Subject, "whenThereIsSubject" will return it.', () => {
  const subject = 'subject';
  const mailToSlackMsg = new MailToSlackMsg({ subject });

  expect(mailToSlackMsg.whenThereIsSubject()).toBe(`*${subject}*`);
  expect(mailToSlackMsg.get()).toBe(`:email: *${subject}*`);
});

test('if set the Attachments, "whenThereIsAttachments" will return it.', () => {
  const attachments = [{ fileName: 'hoge.txt' }, { fileName: 'fuga.jpg' }];
  const mailToSlackMsg = new MailToSlackMsg({ attachments });

  expect(mailToSlackMsg.whenThereIsAttachments()).toBe(':open_file_folder: `hoge.txt` `fuga.jpg`');
});

test('if did not set all parameters, "get" will return it.', () => {
  const mailToSlackMsg = new MailToSlackMsg({});

  expect(mailToSlackMsg.get()).toBe(':email: ');
});
