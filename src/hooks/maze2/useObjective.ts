import { ObjectivePositioning } from './basePosition';

export function useObjective(questionId: number): {
  loaded: boolean;
  positioning: ObjectivePositioning;
  render: (canvas: CanvasRenderingContext2D) => void;
} {
  return {
    loaded: true,
    positioning: {
      type: 'objective',
      h: questionId,
      w: 20,
      x: 0,
      y: 0,
    },
    render: () => undefined,
  };
}
