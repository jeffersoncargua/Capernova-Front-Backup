

export const TeacherCard = ({teacher,index}) => {


  return (
    <div className={`flex ${index % 2 === 0 ? 'md:justify-start':'md:justify-end'} mb-10`}>
        <div class="mx-auto md:mx-0 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class={`${index % 2 === 0 ? 'md:order-1':'md:order-2'} object-fill w-full rounded-t-lg h-96 md:h-full md:w-80 md:rounded-none md:rounded-s-lg`} src={`https://drive.google.com/thumbnail?id=${teacher.photoURL}`} alt="" />
            <div class={`${index % 2 === 0 ? 'md:order-2':'md:order-1'} flex flex-col justify-between p-4 leading-normal`}>
                <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-white">{`${teacher.name} ${teacher.lastName}`}</h5>
                <p class="mb-3 font-normal dark:text-white">{teacher.biografy}</p>
            </div>
        </div>
    </div>
  )
}


/*

<a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a>


*/