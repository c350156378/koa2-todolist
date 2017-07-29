import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lists'
})
export class ListsPipe implements PipeTransform {

  transform(lists, status): any {
    if(status === 1){
      return lists.filter(list => !list.status);
    }else{
      return lists.filter(list => list.status);
    }
    
  }

}
