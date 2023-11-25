const SectionTitle = ({heading,subheading}) => {
    return (
        <div className="mb-10 mt-10 text-center">
            <p className="text-[#12bbe6] text-xl mb-5">{subheading}</p>
            <h1 className="text-4xl font-bold font-mono border-y-4 max-w-xl mx-auto text-blue-800">{heading}</h1>
        </div>
    );
};

export default SectionTitle;