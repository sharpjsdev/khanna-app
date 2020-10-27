import { FoodTypePipe } from './food-type.pipe';

describe('FoodTypePipe', () => {
  it('create an instance', () => {
    const pipe = new FoodTypePipe();
    expect(pipe).toBeTruthy();
  });
});
