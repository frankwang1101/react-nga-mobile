import {TAB_TYPE_COLLECT,TAB_TYPE_COMMON} from '../constants/index'

export interface User{
  id:string,
  name:string,
  username:string,
  avatar?:string
}

export interface Page{
  route:string,
  type:string,
  data:string
}

export interface ColumnIcon{
  name:string,
  seq:number,
  picUrl:string
} 

const enum tabType{TAB_TYPE_COLLECT,TAB_TYPE_COMMON};

export interface Column{
  name:string,
  seq:number,
  desc?:string,
  icons?:Array<ColumnIcon>
}

export interface TabData{
  title:string,
  seq:number,
  type:tabType,
  list:Array<Column>,
}
