"use client";

import { CheckCheck, FileCheck, Microwave, Package, Truck } from 'lucide-react';
import { Step, StepItem, Stepper } from '@/components/stepper'
import React from 'react'

const steps = [
    { label: 'Received', icon: FileCheck, description: 'We are confirming your order' },
    { label: 'Confirmed', icon: Package, description: 'We have started preparing your order' },
    { label: 'Prepared', icon: Microwave, description: 'Ready for the pickup' },
    { label: 'Out for delivery', icon: Truck, description: 'Driver is on the way' },
    { label: 'Delivered', icon: CheckCheck, description: 'Order completed' },
] satisfies StepItem[];

const OrderStatus = () => {
  return (
   <Stepper initialStep={0} steps={steps} variant='circle-alt'>
        {
            steps.map((stepProps,index)=>{
                return (
                    <Step key={stepProps.label} {...stepProps} >
							<div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
								<h1 className="text-xl">Step {index + 1}</h1>
							</div>
						</Step>
                )
            })
        }
    </Stepper>
  )
}

export default OrderStatus