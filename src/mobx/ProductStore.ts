import { computed, makeObservable, observable, action  } from "mobx";
import { TableRowData, FormType } from '../interfaces/index';
import data from "@/data/items.json"


class ProductStore {
  products: TableRowData[] = [];
  filter: string = "";
  values: FormType = {itemNumber:"", orderNumber:"", type:""};
  isFilter:boolean = false;
  isSeached:boolean = false;
  isLoading:boolean = false;
  selectedTypes: string[] = [] 
  isSort:boolean = false;

  constructor() {
    makeObservable(this, {
      products: observable,
      filter: observable,
      isFilter: observable,
      isLoading: observable,
      isSeached: observable,
      isSort: observable,
      setProducts:observable,
      setFilter:observable,
      getProductList:observable,
      setSearched:observable,
      filterWithMultipleFields:observable,
      resetAll:observable,
      toggleFilter:observable,
      toggleLoading:observable,
      toggleSort:observable,
      formFilterValue:observable
    });
  }
  getData (){
    setTimeout(()=> {
return data
    }, 3000)
  }

  setProducts(products: TableRowData[]) {
    this.products = products;
  }
  setFilter(payload: string) {
    this.filter = payload;
  }

 async getProductList() {
     this.toggleLoading()
    setTimeout(()=> {
        this.toggleLoading()
        this.setSearched(true)
        this.setProducts(data)
            }, 3000)
  }
setSearched(payload:boolean){
        this.isSeached = payload
    }


filterProduct(payload:string) {
    this.setFilter(payload)
    if(!this.filter) return
    this.toggleLoading()
    const keywordsArray = this.filter.split(',').map(keyword => keyword.trim());
    setTimeout(()=> {
        this.toggleLoading()
        this.setSearched(true)
        this.setProducts(data.filter(obj => keywordsArray.includes(obj.item)));
            }, 3000)
    }

combineStrings(...strings:string[]):string  {
    let filtered = strings.filter(function(str) {
        return str.trim() !== "";
    })
   
        return filtered.join(",");
      };


filterWithMultipleFields( formValues:FormType){
        this.toggleLoading()
        const allvalues: string[]  = []
        const typesString = this.selectedTypes.join(',');
        const yous: string[] = [...allvalues, this.filter, formValues.orderNumber, typesString]  
        let query = ""
            query =  this.combineStrings(...yous)
        let searchFields = query.split(',');
        const  payload :TableRowData[] = data
            query = query.toLowerCase();

        let results = payload.filter(item => {
                return searchFields.some(field => {
                    return item.item.toLowerCase().includes(field.toLowerCase()) ||
                    item.order.toLowerCase().includes(field.toLowerCase())  || 
                    item.type.toLowerCase().includes(field.toLowerCase());
                    });
            });
               
        setTimeout(() => {
            this.toggleLoading()
            this.setSearched(true)
            this.toggleFilter()           
            this.setProducts(results)

        },3000)
    }



setSelectedTypes(payload:string){
    if(this.selectedTypes.includes(payload)){
        this.selectedTypes = this.selectedTypes.filter(
            (value) => value !== payload)
    } else {
        this.selectedTypes.push(payload);
         
    }
}

formFilterValue(values:FormType){
    this.setFilter(values.itemNumber)
this.values = values;
}

resetAll(){
    this.setProducts([]);
    this.setSearched(false)
    this.isLoading = false,
    this.setFilter("")
   

}

toggleFilter(){
   this.isFilter = !this.isFilter; 
}

toggleLoading(){
   this.isLoading = !this.isLoading; 
}

toggleSort(){
   this.isSort = !this.isSort; 
}

}
const productStore = new ProductStore();

export default productStore;