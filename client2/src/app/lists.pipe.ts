/*
 * @Author: your name
 * @Date: 2019-10-31 09:41:38
 * @LastEditTime: 2019-11-23 13:33:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\client2\src\app\lists.pipe.ts
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lists',
  pure:false
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
