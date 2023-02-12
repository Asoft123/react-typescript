
function generateRandomArrayOfItems(items:string[], categories:string[],types:string[], count:number) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const index = Math.floor(Math.random() * items.length);
      const typesIdx = Math.floor(Math.random() * types.length);
      const categoryIdx = Math.floor(Math.random() * categories.length);
      const orderId = Math.random()
      result.push({
      order: orderId.toString().split(".")[1],
      type:types[typesIdx],
      item: items[index],
      category: categories[categoryIdx],
      description:`Item description ${i +1}`
        
        
      });
    }
    return result; 
  }
  const types:string[] = ["EDF", "CAO","SFO" ]
  const categories :string[]= ["fruit 1", "fruit 2", "fruit 3", "fruit 4","fruit 5", "fruit 6","fruit 7", "fruit 8", "fruit 9", "fruit 10" ];
  const items:string[] = ["86886895", "86346895", "34586895", "34324223","46476734", "43454523","95053213", "13453268", "44554422", "2435657" ];
  const count:number = 50;
  const randomArrayItems = generateRandomArrayOfItems(items, categories, types, 100);
  console.log(randomArrayItems);
  