[email-to-slack](../README.md) › [Globals](../globals.md) › ["lib/mail-to-slack-msg"](../modules/_lib_mail_to_slack_msg_.md) › [MailToSlackMsg](_lib_mail_to_slack_msg_.mailtoslackmsg.md)

# Class: MailToSlackMsg

## Hierarchy

* **MailToSlackMsg**

## Index

### Constructors

* [constructor](_lib_mail_to_slack_msg_.mailtoslackmsg.md#constructor)

### Properties

* [$](_lib_mail_to_slack_msg_.mailtoslackmsg.md#private-)
* [attachments](_lib_mail_to_slack_msg_.mailtoslackmsg.md#private-attachments)
* [cc](_lib_mail_to_slack_msg_.mailtoslackmsg.md#private-cc)
* [date](_lib_mail_to_slack_msg_.mailtoslackmsg.md#private-date)
* [from](_lib_mail_to_slack_msg_.mailtoslackmsg.md#private-from)
* [subject](_lib_mail_to_slack_msg_.mailtoslackmsg.md#private-subject)
* [to](_lib_mail_to_slack_msg_.mailtoslackmsg.md#private-to)

### Methods

* [get](_lib_mail_to_slack_msg_.mailtoslackmsg.md#get)
* [getBody](_lib_mail_to_slack_msg_.mailtoslackmsg.md#getbody)
* [getImgs](_lib_mail_to_slack_msg_.mailtoslackmsg.md#getimgs)
* [getLinks](_lib_mail_to_slack_msg_.mailtoslackmsg.md#getlinks)
* [getSenderAndReceiver](_lib_mail_to_slack_msg_.mailtoslackmsg.md#getsenderandreceiver)
* [whenThereIsAttachments](_lib_mail_to_slack_msg_.mailtoslackmsg.md#whenthereisattachments)
* [whenThereIsDate](_lib_mail_to_slack_msg_.mailtoslackmsg.md#whenthereisdate)
* [whenThereIsSubject](_lib_mail_to_slack_msg_.mailtoslackmsg.md#whenthereissubject)

## Constructors

###  constructor

\+ **new MailToSlackMsg**(`op`: object): *[MailToSlackMsg](_lib_mail_to_slack_msg_.mailtoslackmsg.md)*

*Defined in [lib/mail-to-slack-msg.ts:21](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L21)*

plz, set the options from email info for other methods.

**Parameters:**

▪ **op**: *object*

plz, set the email info.

Name | Type |
------ | ------ |
`attachments?` | [Attachment](_lib_mail_to_slack_msg_.attachment.md)[] |
`cc?` | [Mail](_lib_mail_to_slack_msg_.mail.md)[] |
`date?` | string |
`from?` | [Mail](_lib_mail_to_slack_msg_.mail.md)[] |
`html?` | string |
`subject?` | string |
`to?` | [Mail](_lib_mail_to_slack_msg_.mail.md)[] |

**Returns:** *[MailToSlackMsg](_lib_mail_to_slack_msg_.mailtoslackmsg.md)*

## Properties

### `Private` $

• **$**: *CheerioStatic*

*Defined in [lib/mail-to-slack-msg.ts:21](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L21)*

___

### `Private` attachments

• **attachments**: *[Attachment](_lib_mail_to_slack_msg_.attachment.md)[]*

*Defined in [lib/mail-to-slack-msg.ts:20](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L20)*

___

### `Private` cc

• **cc**: *[Mail](_lib_mail_to_slack_msg_.mail.md)[]*

*Defined in [lib/mail-to-slack-msg.ts:17](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L17)*

___

### `Private` date

• **date**: *string*

*Defined in [lib/mail-to-slack-msg.ts:19](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L19)*

___

### `Private` from

• **from**: *[Mail](_lib_mail_to_slack_msg_.mail.md)[]*

*Defined in [lib/mail-to-slack-msg.ts:15](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L15)*

___

### `Private` subject

• **subject**: *string*

*Defined in [lib/mail-to-slack-msg.ts:18](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L18)*

___

### `Private` to

• **to**: *[Mail](_lib_mail_to_slack_msg_.mail.md)[]*

*Defined in [lib/mail-to-slack-msg.ts:16](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L16)*

## Methods

###  get

▸ **get**(): *string*

*Defined in [lib/mail-to-slack-msg.ts:48](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L48)*

You can customize slack msg format if you can rewrite this method.

**Returns:** *string*

___

###  getBody

▸ **getBody**(): *string*

*Defined in [lib/mail-to-slack-msg.ts:185](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L185)*

This method will return the email's contents.

**Returns:** *string*

___

###  getImgs

▸ **getImgs**(): *string*

*Defined in [lib/mail-to-slack-msg.ts:152](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L152)*

This method will return the img-alt and urls if there is the images in email.
The image will be rejected if The protocol of image's url is not http / https.

**Returns:** *string*

___

###  getLinks

▸ **getLinks**(): *string*

*Defined in [lib/mail-to-slack-msg.ts:118](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L118)*

This method will return the link-text and urls if there is the links in email.

**Returns:** *string*

___

###  getSenderAndReceiver

▸ **getSenderAndReceiver**(): *string*

*Defined in [lib/mail-to-slack-msg.ts:65](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L65)*

This method will get sender ( form ) and receiver ( to, cc ) information from email info.

**Returns:** *string*

___

###  whenThereIsAttachments

▸ **whenThereIsAttachments**(): *string*

*Defined in [lib/mail-to-slack-msg.ts:107](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L107)*

This method will return the attachment's file names if there is the attachments.

**Returns:** *string*

___

###  whenThereIsDate

▸ **whenThereIsDate**(): *string*

*Defined in [lib/mail-to-slack-msg.ts:96](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L96)*

This method will return the date if there is the date.

**Returns:** *string*

___

###  whenThereIsSubject

▸ **whenThereIsSubject**(): *string*

*Defined in [lib/mail-to-slack-msg.ts:85](https://github.com/waricoma/email-to-slack/blob/3c24576/lib/mail-to-slack-msg.ts#L85)*

This method will return the subject if there is the subject.

**Returns:** *string*
