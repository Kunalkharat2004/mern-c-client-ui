"use client";

import { CheckCheck, FileCheck, Microwave, Package, Truck } from 'lucide-react';
import { Step, StepItem, Stepper, useStepper } from '@/components/stepper'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getSingleOrder } from '@/lib/http/api';

const steps = [
    { label: 'Received', icon: FileCheck, description: 'We are confirming your order' },
    { label: 'Confirmed', icon: Package, description: 'We have started preparing your order' },
    { label: 'Prepared', icon: Microwave, description: 'Ready for the pickup' },
    { label: 'Out for delivery', icon: Truck, description: 'Driver is on the way' },
    { label: 'Delivered', icon: CheckCheck, description: 'Order completed' },
] satisfies StepItem[];


const statusMapping = {
    received: 0,
    confirmed: 1,
    prepared: 2,
    out_for_deliver: 3,
    delivered: 4,
} as { [key: string]: number };

const StepperChanger = ({orderId}:{orderId:string}) =>{
    const {setStep} = useStepper();
    console.log("Orderid: ",orderId);
    const {data} = useQuery({
        queryKey:["order",orderId],
        queryFn: async() =>{
            const fields = "orderStatus";
            return await getSingleOrder({orderId,fields}).then(res=> res.data);
        },
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 30 // refetch after
    })
    useEffect(()=>{
        if(data){
            const currentStep = statusMapping[data.orderStatus] || 0;
            setStep(currentStep + 1);
        }
    },[data,setStep]);

    return (
        <></>
    )
}

const OrderStatus = ({orderId}:{orderId:string}) => {
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
        <StepperChanger orderId={orderId}/>
    </Stepper>
  )
}

export default OrderStatus