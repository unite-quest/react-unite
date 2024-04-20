export class AnswersModel {
  answers: string[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    if (!data) {
      throw new TypeError('Invalid data from secret');
    }

    const open = atob(data);
    const parsed = JSON.parse(open);
    if (Array.isArray(parsed)) {
      this.answers = parsed.filter(answer => !!answer).map(answer => String(answer));
      return;
    }

    throw new TypeError('Invalid data from secret');
  }
}
