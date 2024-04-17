interface ArrayAnswers {
  type: 'array';
  challengeId: string;
  data: string[];
}
interface StraightAnswer {
  type: 'straight';
  challengeId: string;
  data: string;
}

export class AnswersModel {
  answer: ArrayAnswers | StraightAnswer;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    if (!data || !data.type) {
      throw new TypeError('Invalid data from collection');
    }

    if (data.type === 'array' && Array.isArray(data.answers)) {
      this.answer = {
        type: 'array',
        challengeId: data.challengeId,
        data: data.answers,
      };
      return;
    }

    throw new TypeError('Unable to parse response');
  }
}
