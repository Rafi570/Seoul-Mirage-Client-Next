import Banner from '@/components/home/Banner'
import JoinCom from '@/components/home/JoinCom'
import JustTake from '@/components/home/JustTake'
import Philosophy from '@/components/home/Philosophy'
import React from 'react'
import Bestsellers from './bestsellers/page'

export default function page() {
  return (
      <div>
      <Banner></Banner>
      <Bestsellers></Bestsellers>
      <Philosophy></Philosophy>
      <JustTake></JustTake>
      <JoinCom></JoinCom>
    </div>
  )
}
