'use strict';

import { MailToSlackMsg } from '../lib/mail-to-slack-msg';

test('if set the email list of "from", "getSenderAndReceiver" will return it.', () => {
  const mailToSlackMsg = new MailToSlackMsg({
    from: [{ name: 'Taro Yamada', address: 'tyamada@example.com' }, { address: 'hanako@example.com' }],
  });

  expect(mailToSlackMsg.getSenderAndReceiver()).toBe('> from Taro Yamada tyamada@example.com / hanako@example.com');
});
