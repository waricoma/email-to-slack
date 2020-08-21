[email-to-slack](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Variables

* [ENV](_index_.md#const-env)
* [n](_index_.md#const-n)
* [webhook](_index_.md#const-webhook)

## Variables

### `Const` ENV

• **ENV**: *ProcessEnv‹›* = process.env

*Defined in [index.ts:10](https://github.com/waricoma/email-to-slack/blob/3c24576/index.ts#L10)*

___

### `Const` n

• **n**: *any* = notifier({
  user: ENV.EMAIL,
  password: ENV.PASSWORD,
  host: ENV.HOST,
  port: ENV.PORT,
  tls: false,
  tlsOptions: { rejectUnauthorized: false },
})

*Defined in [index.ts:14](https://github.com/waricoma/email-to-slack/blob/3c24576/index.ts#L14)*

___

### `Const` webhook

• **webhook**: *IncomingWebhook‹›* = new IncomingWebhook(ENV.SLACK_WEBHOOK_URL)

*Defined in [index.ts:12](https://github.com/waricoma/email-to-slack/blob/3c24576/index.ts#L12)*
