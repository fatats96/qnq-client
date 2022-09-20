import { Box, Button, Center, Container, Stack, StackDivider, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AxiosInstance } from '../common/http-wrapper';
import MovieCard from '../components/MovieCard';
import { Movie } from '../interfaces/movie';

export default function HomePage() {
    const [data, setData] = useState<Movie[][]>([[]]);
    const [page, setPage] = useState(1);
    const [dataCount, setDataCount] = useState(20);
    const [dataLength, setDataLength] = useState(20);

    const splitMoviesIntoChunk = (movies: Movie[], chunkSize = 6) => {
        const res = [];
        for (let i = 0; i < movies.length; i += chunkSize) {
            const chunk = movies.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    useEffect(() => {
        AxiosInstance.get<Movie[]>(`Movie?Page=${page}&Count=${dataCount}`).then(r => {
            console.log(splitMoviesIntoChunk(r.data) as any)
            setData(splitMoviesIntoChunk(r.data) as any)
        });
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data]);

    useEffect(() => {
        if (page !== 1) {
            AxiosInstance.get<Movie[]>(`Movie?Page=${page}&Count=${dataCount}`).then(r => {
                const newList = data.flatMap(x => x);
                r.data.forEach(x => {
                    newList.push(x);
                })
                setDataLength(newList.length);
                setData(splitMoviesIntoChunk(newList));
            });
        }

    }, [page]);


    const fetchMoreData = () => {
        setPage(page + 1);
        console.log(page)


    }

    // if (data)
    //     return <MovieCard movie={data[0]?.movies[0]} />

    if (data && data?.length > 0) {
        return <Container maxW={'6x1'}>
            <>
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    align='stretch'
                >
                    <InfiniteScroll
                        dataLength={dataLength}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                    >
                        {data.map((r, index) =>
                            <Stack key={`row-stack-${index}`} direction={['row']} spacing='24px' style={{ marginBottom: 10 }}>
                                {r.map(mov => <Box className="movie-box" key={`movie-box-${mov.id}`}>
                                    <MovieCard movie={mov} />
                                </Box>)}
                            </Stack>
                        )}
                    </InfiniteScroll>
                </VStack>
            </>
        </Container>
    }
    return <h1>loading</h1>;
}