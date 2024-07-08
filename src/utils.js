import { AppImages } from "./Assets/Images";

export const getWeatherIcon = conditions => {
    switch (conditions) {
        case 'Clear':
            return AppImages.sun;
        case 'Rain':
            return AppImages.umbrella;
        case 'Partially Cloud':
            return AppImages.sunSlowRain;
        default:
            return AppImages.start;
    }
};