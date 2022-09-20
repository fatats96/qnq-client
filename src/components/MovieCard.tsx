import {
    Box,
    Text,
    Image,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { Movie } from '../interfaces/movie';

export default function MovieCard({ movie }: { movie: Movie }) {
    const location = useLocation();
    const history = useHistory();

    return (
        <Box
            maxW={'220'}
            height={'460'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
            onClick={() => { window.location.href = '/movie-detail/' + movie.id }}
        >
            <Box
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}
                w={220}
                h={330}
                pos={'relative'}>
                <Image
                    src={
                        `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.posterPath}`
                    }
                />
            </Box>
            <Stack>
                <Text
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'sm'}
                    letterSpacing={1.1}
                >
                    {movie.title}
                    <Text color={'gray.500'}>{movie.releaseDate}</Text>
                </Text>
            </Stack>
        </Box>
    );
}