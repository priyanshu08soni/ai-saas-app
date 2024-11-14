import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';


const AddTransformationTypePage = async({ params } : SearchParamProps) => {
  const { userId }  = await auth();
  const transformation = transformationTypes[(await params).type];
  if(!userId) redirect('/sign-in');
  const user = await getUserById(userId);
  return (
    <>
      {/* getting the transformation type from params
      then getting the object by using this type value
      then updating title and subtitle from transformation */}
      <Header title= {transformation.title} subtitle={transformation.subTitle} />
      <section className='mt-10'>
        <TransformationForm
          action = "Add"
          userId = {user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage
