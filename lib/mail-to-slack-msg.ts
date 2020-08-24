'use strict';

import cheerio from 'cheerio';

class Mail {
  public name?: string;
  public address: string;
}

class Attachment {
  public fileName: string;
}

export class MailToSlackMsg {
  private from: Mail[];
  private to: Mail[];
  private cc: Mail[];
  private subject: string;
  private date: string;
  private attachments: Attachment[];
  private $: CheerioStatic;

  /**
   * plz, set the options from email info for other methods.
   * @param op plz, set the email info.
   */
  constructor(op: {
    from?: Mail[];
    to?: Mail[];
    cc?: Mail[];
    subject?: string;
    date?: string;
    attachments?: Attachment[];
    html?: string;
  }) {
    this.from = op.from;
    this.to = op.to;
    this.cc = op.cc;
    this.subject = op.subject;
    this.date = op.date;
    this.attachments = op.attachments;
    this.$ = cheerio.load(op.html || '');
  }

  /**
   * You can customize slack msg format if you can rewrite this method.
   */
  public get(): string {
    return [
      `:email: ${this.whenThereIsSubject()}`,
      this.whenThereIsDate(),
      this.getSenderAndReceiver(),
      this.getLinks(),
      this.getImgs(),
      this.getBody(),
      this.whenThereIsAttachments(),
    ]
      .filter((_) => _ !== '')
      .join('\n');
  }

  /**
   * This method will get sender ( form ) and receiver ( to, cc ) information from email info.
   */
  public getSenderAndReceiver(): string {
    return [
      { type: 'from', list: this.from },
      { type: 'to', list: this.to },
      { type: 'cc', list: this.cc },
    ]
      .map((mails): string => {
        if (!mails.list) {
          return '';
        }

        return `> ${mails.type} ${mails.list.map((mail) => `${mail.name || ''} ${mail.address}`.trim()).join(' / ')}`;
      })
      .filter((_) => _ !== '')
      .join('\n');
  }

  /**
   * This method will return the subject if there is the subject.
   */
  public whenThereIsSubject(): string {
    if (!this.subject) {
      return '';
    }

    return `*${this.subject}*`;
  }

  /**
   * This method will return the date if there is the date.
   */
  public whenThereIsDate(): string {
    if (!this.date) {
      return '';
    }

    return `:clock2: \`${this.date}\``;
  }

  /**
   * This method will return the attachment's file names if there is the attachments.
   */
  public whenThereIsAttachments(): string {
    if (!this.attachments) {
      return '';
    }

    return `:open_file_folder: \`${this.attachments.map((_) => _.fileName).join('` `')}\``;
  }

  /**
   * This method will return the link-text and urls if there is the links in email.
   */
  public getLinks(): string {
    const links = this.$('a')
      .map((i, elm): string => {
        const linkName = this.$(elm).text().trim();

        /**
         * WARNING: On Windows, `elm.attribs.href` always has `\"` so We need to remove it.
         */
        const linkHref = (elm.attribs.href || '').replace(/\\"/g, '').trim();

        if (linkName === '' && linkHref === '') {
          return '';
        }

        if (linkName === linkHref) {
          return `> ${linkHref}`;
        }

        if (linkName === '' || linkHref === '') {
          return `> ${linkName}${linkHref}`;
        }

        return `> ${linkName} ${linkHref}`;
      })
      .get()
      .filter((_) => _ !== '');

    if (links.length === 0) {
      return '';
    }

    return `:link:\n${links.join('\n')}`;
  }

  /**
   * This method will return the img-alt and urls if there is the images in email.
   * The image will be rejected if The protocol of image's url is not http / https.
   */
  public getImgs(): string {
    const imgs = this.$('img')
      .map((i, elm): string => {
        const imgName = elm.attribs.alt || '';

        /**
         * WARNING: On Windows, `elm.attribs.href` always has `\"` so We need to remove it.
         */
        const imgSrc = (elm.attribs.src || '').replace(/\\"/g, '').trim();

        if ((imgName === '' && imgSrc === '') || !imgSrc.match(/^http/gi)) {
          return '';
        }

        if (imgName === imgSrc || imgName === '') {
          return `> ${imgSrc}`;
        }

        return `> ${imgName} ${imgSrc}`;
      })
      .get()
      .filter((_) => _ !== '');

    if (imgs.length === 0) {
      return '';
    }

    return `:frame_with_picture:\n${imgs.join('\n')}`;
  }

  /**
   * This method will return the email's contents.
   */
  public getBody(): string {
    const bodyText = cheerio.load(this.$('body').html().replace(/<br>/gi, '\n'))('body').text().trim();

    /**
     * The empty email's contents is empty but this may include enter-code when some time.
     */
    if (bodyText === '') {
      return '';
    }

    return `\`\`\`${bodyText}\`\`\``;
  }
}
