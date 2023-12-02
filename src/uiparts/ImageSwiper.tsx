import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Import your images
import echonorLogo from "../images/introduction/echonor_logo.png";
import home from "../images/introduction/home.png";
import menu from "../images/introduction/menu.png";
import alert from "../images/introduction/alert.png";
import bookmarks from "../images/introduction/bookmarks.png";
import post from "../images/introduction/post.png";

const ImageSwiper = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const imageSize = isMobile ? "80%" : "30%";
    const imageStyle = {
        width: imageSize,
        height: imageSize,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    };

    const images = [echonorLogo, home, post, menu, alert, bookmarks];

    return (
        <Box sx={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }}>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                navigation={true}
            >
                <Container sx={{display: 'flex', justifyContent: "center"}}>
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} style={imageStyle} alt={`Slide ${index}`} />
                        </SwiperSlide>
                    ))}
                </Container>
            </Swiper>
        </Box>
    );
}

export default ImageSwiper;
