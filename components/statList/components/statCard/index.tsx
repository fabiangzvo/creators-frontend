import { JSX } from 'react'
import { Card, CardBody } from '@heroui/card';

import { StatCardProps } from './types';

function StatCard(props: StatCardProps): JSX.Element {
  const { title, content, Icon } = props

  return (
    <Card className='h-28'>
      <CardBody className='flex flex-row items-center justify-around'>
        <div className='w-2/3'>
          <h2 className="font-semibold text-foreground/50">{title}</h2>
          <p className='text-2xl font-bold'>{Intl.NumberFormat().format(content)}</p>
        </div>
        <div className='flex justify-center bg-primary-50 rounded-full px-5 py-5 text-primary-500'>
          <Icon strokeWidth={2} size={30} />
        </div>
      </CardBody>
    </Card>
  )
}

export default StatCard