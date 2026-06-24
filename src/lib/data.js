export const doctorsData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOCTORS_URI}/allData`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data
}