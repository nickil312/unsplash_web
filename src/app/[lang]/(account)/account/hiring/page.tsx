'use client'
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {fetchChangeHireData, fetchGetHireData} from "@/app/globalRedux/users/asyncActions";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {Status} from "@/app/globalRedux/posts/types";

interface City {
    id: string;
    label: { en: string; ru: string };
}

export const work: City[] = [
    {
        id: 'Wedding',
        label: {en: 'Wedding', ru: 'Свадьба'},

    },
    {
        id: 'Food',
        label: {en: 'Food', ru: 'Еда'},

    },
    {
        id: 'Product',
        label: {en: 'Product', ru: 'Товар'},

    },
    {
        id: 'Lifestyle',
        label: {en: 'Lifestyle', ru: 'Стиль жизни'},

    },
    {
        id: 'Portrait',
        label: {en: 'Portrait', ru: 'Портрет'},

    },
    {
        id: 'Boudoir',
        label: {en: 'Boudoir', ru: 'Будуар'},

    },
    {
        id: 'Real_Estate',
        label: {en: 'Real Estate', ru: 'Недвиж.'},

    },
    {
        id: 'Marketing_&_Social Media',
        label: {en: 'Marketing & Social Media', ru: 'Маркетинг и соц. сети'},

    },
    {
        id: 'Newborn',
        label: {en: 'Newborn', ru: 'Дети'},
    },
    {
        id: 'Fashion',
        label: {en: 'Fashion', ru: 'Мода'},
    },
    {
        id: 'Event',
        label: {en: 'Event', ru: 'Событие'},
    },
    {
        id: 'Travel',
        label: {en: 'Travel', ru: 'Путеш.'},
    },

]
export const Cities: City[] = [
    {
        id: 'New_York_City',
        label: {en: 'New York City, USA', ru: 'Нью Йорк, США'},

    },
    {
        id: 'San_Francisco',
        label: {en: 'San Francisco, USA', ru: 'Сан Франциско, США'},

    },
    {
        id: 'Montreal',
        label: {en: 'Montreal, Canada', ru: 'Монреаль, Канада'},

    },
    {
        id: 'Paris',
        label: {en: 'Paris, France', ru: 'Париж, Франция'},

    },
    {
        id: 'Los_Angeles',
        label: {en: 'Los Angeles, USA', ru: 'Лос Анджелес, США'},

    },
    {
        id: 'Boston',
        label: {en: 'Boston, USA', ru: 'Бостон, США'},

    },
    {
        id: 'Vancouver',
        label: {en: 'Vancouver, Canada', ru: 'Ванкувер, Канада'},

    },
    {
        id: 'Berlin',
        label: {en: 'Berlin, Germany', ru: 'Берлин, Германия'},

    },
    {
        id: 'Chicago',
        label: {en: 'Chicago, USA', ru: 'Чикаго, США'},

    },
    {
        id: 'Toronto',
        label: {en: 'Toronto, Canada', ru: 'Торонто, Канада'},

    },
    {
        id: 'London',
        label: {en: 'London, UK', ru: 'Лондон, НК'},

    },
    {
        id: 'Tokyo',
        label: {en: 'Tokyo, Japan', ru: 'Токио, Япония'},

    }
];

export default function HiringPage() {
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedWork, setSelectedWork] = useState<string[]>([]);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const [hireValue, setHireValue] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchGetHireData())
            .then((response) => {
                console.log(response)
                if (response.meta.requestStatus === 'rejected') {
                    console.log("Request failed")
                    // setSendResponseErrorImage(true)
                } else if (response.meta.requestStatus === 'fulfilled') {
                    // console.log("Request fulfilled")

                    const {payload} = response;
                    // console.log("payload", payload);

                    if (payload !== null) {
                        // console.log("payload", payload);
                        const payloadData = payload as {
                            hirevalue: boolean;
                            cities: string[];
                            work: string[];
                        };

                        // Extract data from payload
                        const {
                            hirevalue,
                            cities,
                            work,
                        } = payloadData;
                        // console.log("payloadData",payloadData)
                        setHireValue(hirevalue);
                        setSelectedCities(cities);
                        setSelectedWork(work);
                    }


                    // if (items !== null) {
                    //
                    //     console.log("items", items);
                    //     if (items.hireValue) {
                    //         setHireValue(items.hireValue);
                    //
                    //     } else {
                    //
                    //     }
                    //     if (items.work) {
                    //         setSelectedWork(items.work);
                    //     } else {
                    //
                    //     }
                    //     if (items.cities) {
                    //         setSelectedCities(items.cities);
                    //     } else {
                    //
                    //     }


                    // }
                    // router.push(`/${lang}`);
                    // setSuccessImageChange(true)
                }
                // handle success response
            })
            .catch((error) => {
                console.log(error)

            })
        // if (data) {
        //     if(data.hirevalue){
        //         setHireValue(data.hirevalue);
        //         console.log(data.hirevalue);
        //
        //     }else{
        //
        //     }
        //     if(data.work){
        //         setSelectedWork(data.work);
        //     }else{
        //
        //     }
        //     if(data.cities){
        //         setSelectedCities(data.cities);
        //     }else{
        //
        //     }
        // setSelectedWork(data.work);
    // }
    }, []);

    const handleCheckboxChange = (cityId: string) => {
        const currentIndex = selectedCities.indexOf(cityId);
        const newSelectedCities = [...selectedCities];

        if (currentIndex === -1) {
            newSelectedCities.push(cityId);
        } else {
            newSelectedCities.splice(currentIndex, 1);
        }

        setSelectedCities(newSelectedCities);
    };
    const handleCheckboxChangeWork = (cityId: string) => {
        const currentIndex = selectedWork.indexOf(cityId);
        const newSelectedWork = [...selectedWork];

        if (currentIndex === -1) {
            newSelectedWork.push(cityId);
        } else {
            newSelectedWork.splice(currentIndex, 1);
        }

        setSelectedWork(newSelectedWork);
    };


    const onSubmit = (() => {
        // console.log("selectedCities",selectedCities)
        // console.log("selectedWork",selectedWork)
        // console.log("hireValue",hireValue)
        const data = {
            cities: selectedCities,
            work: selectedWork,
            hirevalue: hireValue,
        }
        console.log(data)
        dispatch(fetchChangeHireData(data))
            .then((response) => {
                console.log(response)
                if (response.meta.requestStatus === 'rejected') {
                    // console.log("Request failed")
                    setError(true);
                } else if (response.meta.requestStatus === 'fulfilled') {
                    // console.log("Request fulfilled")
                    // router.push(`/${lang}`);
                    setSuccess(true);

                }
                // handle success response
            })
            .catch((error) => {
                console.log(error)

            })
    })

    return (
        <>

            <div className="relative mb-8 flex flex-col items-start ">
                <p className="settings_Title_adaptive">{lang === "en" ? <>Hire</> : <>Найм</>}</p>

                <div
                    className="hire_block_adaptive">

                    <div className="relative block ">
                        <input name="user[allow_messages]" type="hidden" value="0"
                               autoComplete="off"/>
                        <input id="allow-messages-checkbox"
                               className="mr-[8px] "
                               type="checkbox" value="1"
                               checked={hireValue}
                               onChange={() => {
                                   setHireValue(!hireValue);
                               }}
                               name="user[allow_messages]"/>
                        <label className="text-sm  " htmlFor="allow-messages-checkbox">
                            {lang === "en" ? <>Yes, feature my Unsplash profile on hiring pages and display a 'Hire'
                                button</> : <>Да, разместить мой профиль Unsplash на страницах по найму и показывать
                                кнопку 'Нанять'</>}
                        </label>
                    </div>


                    <div
                        className=" pt-0.5 w-fit h-6 px-2.5  text-sm text-center text-white bg-[#027DFA] rounded hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <p>{lang === "en" ? <>Hire</> : <>Нанять</>}</p>

                    </div>

                </div>
                <p className="settings_under_input_text">{lang === "en" ? <>Requests will be sent to your
                    email</> : <>Запросы будут отправлены на вашу электронную почту</>}</p>
            </div>

            <fieldset style={{opacity: hireValue ? 1 : 0.5}}>
                <div className="flex flex-col items-start mb-6">
                    <p className="inputStyle_title">{lang === "en" ? <>What kind of photography work are you interested in?</> : <>Какой вид фотоработы вас интересует?</>}<span
                        className="text-76">{lang === "en" ? <> (select all that apply)</> : <> (выбрать все, что подходит)</>}</span></p>
                    <div className="div_block_style">
                        {work.map((city, index) => (
                            <div key={city.id} className="flex items-center px-2 py-1.5 ">
                                <input
                                    type="checkbox"
                                    id={city.id}
                                    name={city.id}
                                    checked={selectedWork ? selectedWork.includes(city.id): false}
                                    onChange={hireValue ? () => handleCheckboxChangeWork(city.id) : undefined}
                                    className="mr-2"
                                />
                                <label htmlFor={city.id}>

                                    {lang === "en" ? <>{city.label.en}</> : <>{city.label.ru}</>}

                                </label>
                            </div>
                        ))}
                    </div>
                    <p className="settings_under_input_text">{lang === "en" ? <>Your profile will be featured in hiring requests for the
                        interests you've selected.</> : <>Ваш профиль будет отображаться в запросах на найм по выбранным вами интересам.</>}</p>
                </div>

                {/*<p>Hiring page</p>*/}
                <div className="flex flex-col items-start mb-6">
                    <p className="inputStyle_title">{lang === "en" ? <>In which cities are you available to shoot?</> : <>В каких городах вы можете проводить съемки?</>}</p>
                    <div className="div_block_style">
                        {Cities.map((city, index) => (
                            <div key={city.id} className="flex items-center px-2 py-1.5 ">
                                <input
                                    type="checkbox"
                                    id={city.id}
                                    name={city.id}
                                    checked={selectedCities ? selectedCities.includes(city.id): false}
                                    onChange={hireValue ? () => handleCheckboxChange(city.id) : undefined}
                                    className="mr-2"
                                />
                                <label htmlFor={city.id}>
                                    {lang === "en" ? <>{city.label.en}</> : <>{city.label.ru}</>}
                                </label>
                            </div>
                        ))}
                    </div>
                    <p className="settings_under_input_text">{lang === "en" ? <>Hiring opportunities are limited to these cities for the moment.</> : <>На данный момент возможности трудоустройства ограничены этими городами.</>}</p>
                </div>
            </fieldset>
            {/*<p>Selected cities: {selectedCities.join(', ')}</p>*/}
            {/*<p>Selected works: {selectedWork.join(', ')}</p>*/}

            <button type="submit"
                    onClick={() => onSubmit()}
                    className="text-white w-full bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg text-lg px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                {lang === "en" ? <>Update hiring availability</> : <>Обновление вакансии</>}
            </button>
            {
                error && (

                    <div id="toast-danger"
                         className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                         role="alert">
                        <div
                            className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                            </svg>
                            <span className="sr-only">Error icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>An error occurred on the server!</> : <>Произошла ошибка на сервере!</>}</div>
                        <button type="button"
                                onClick={() => setError(false)}
                                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                data-dismiss-target="#toast-danger" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                )
            }
            {

                success && (
                    <div id="toast-success"
                         className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                         role="alert">
                        <div
                            className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span className="sr-only">Check icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Data has been changed.</> : <>Данные изменены.</>}</div>
                        <button type="button"
                                onClick={() => setSuccess(false)}
                                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                data-dismiss-target="#toast-success" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                )
            }
        </>
    )
}