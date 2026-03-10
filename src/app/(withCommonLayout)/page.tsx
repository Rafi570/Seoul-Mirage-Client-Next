import Banner from '@/components/home/Banner'
import JoinCom from '@/components/home/JoinCom'
import JustTake from '@/components/home/JustTake'
import Philosophy from '@/components/home/Philosophy'
import React from 'react'
import Bestsellers from './bestsellers/page'
import ShopBy from '@/components/home/ShopBy'
import NewArrive from './newarrive/page'

export default function page() {
  return (
      <div>
      <Banner></Banner>
      <Bestsellers></Bestsellers>
      <ShopBy></ShopBy>
      <NewArrive></NewArrive>
      <Philosophy></Philosophy>
      <JustTake></JustTake>
      <JoinCom></JoinCom>
    </div>
  )
}
