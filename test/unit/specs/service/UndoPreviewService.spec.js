import UndoPreviewService from "../../../../src/renderer/service/UndoPreviewService";

describe('UndoPreviewService.ts', () => {
  it('should output correct ranges', () => {

    const rangeFromArray = UndoPreviewService.getRangesFromIndexArray([1, 2, 3, 5, 6, 8, 9, 10])
    expect(rangeFromArray).equals([
      {
        from: 0,
        to: 3
      },
      {
        from: 3,
        to: 5,
      },
      {
        from: 5,
        to: 8
      }
    ])
  })

});
