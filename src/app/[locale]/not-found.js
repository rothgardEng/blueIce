'use client';
import {useTranslations} from 'next-intl';
import {Link} from '@/src/i18n/routing';

export default function NotFoundPage() {
  return (
    <div className=" justify-center items-center h-screen flex">
      <div  className="text-center ">
      <h1 className="text-6xl text-center font-header">404: Not Found</h1>
      <p className="text-2xl font-text ml-6 mr-6 mt-4 mb-6">
        Requested page could not be found. Be sure to double check spelling and
        url format for the requested resource.
      </p>
      <div className='inline-block'>

      <Link
                  href="/joinus"
                  className="flex justify-center items-center"
                >
                  <button className="block py-3 px-3  rounded btn bg-dark text-white text-lg inline">
                    Join Us
                  </button>
                </Link>
      </div>
      </div>
    </div>
  );
}
