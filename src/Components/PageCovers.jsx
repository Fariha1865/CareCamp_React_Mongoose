import { Parallax } from 'react-parallax';
const PageCovers = ({ image, title, subTitle }) => {
    return (
        <div>
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={image}
                bgImageAlt="the dog"
                strength={-200}
            >

                <div className="hero h-[400px]">
                    <div className="bg-opacity-60"></div>
                    <div className='flex justify-center mt-48'>
                        <div className="hero-content text-center text-neutral-content bg-black bg-opacity-40 p-10 w-[900px] h-[200px]">
                            <div className="flex flex-col items-center">
                                <h1 className="mb-5 text-4xl font-bold text-white text-center">{title}</h1>
                                <p className="mb-5 text-white text-center max-w-2xl mx-auto">{subTitle}</p>

                            </div>
                        </div>
                    </div>
                </div>

            </Parallax>


        </div>
    );
};

export default PageCovers;