import textCharManager from '@/model/TextCharManager.ts'

describe('TextCharManager.ts', () => {
  it('should show created textChars', () => {
    textCharManager.clear()
    textCharManager.createTextChar(0, 'input1 ')
    textCharManager.createTextChar(0, 'input2 ')
    expect(textCharManager.getTextValue()).equals('input2 input1 ')
  })
})
