import { Box, Center, StackDivider, VStack, Text, Stack, Button } from "@chakra-ui/react";
import { AutoComplete, Input } from "antd";
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { AxiosInstance } from "../common/http-wrapper";
import MovieCard from "../components/MovieCard";
import { fetcher } from "../config/fetcher";
import { Movie } from "../interfaces/movie";

const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
});

export default function SearchPage() {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [data, setData] = useState<Movie[]>([]);
    const [isOnMouseEnter, setIsOnMouseEnter] = useState<boolean>(false);

    useEffect(() => {
        console.log(data)
    }, [data]);

    const onSearch = (searchText: string) => {
        if (searchText.length > 0) {
            AxiosInstance.get<Movie[]>(`Movie/GetSearchedMovies?movieName=${searchText}`).then(r => setData(r.data));
            AxiosInstance.get<string[]>(`Movie/GetAutoCompletedMovieNames?movieName=${searchText}`).then(r => setOptions(r.data.map((x: string) => ({ value: x }))));
        }
    };

    const onSelect = (val: string) => {
        AxiosInstance.get<Movie[]>(`Movie/GetSearchedMovies?movieName=${val}`).then(r => setData(r.data));
    };

    return (
        <>
            <AutoComplete
                options={options}
                style={{ width: '100%', marginBottom: 20 }}
                onSelect={onSelect}
                onSearch={onSearch}
            >
                <Input.Search size="large" placeholder="input here" enterButton />
            </AutoComplete>
            <br />
            {
                data && data?.length > 0 &&
                <>
                    <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={4}
                        align='stretch'
                    >
                        <Stack direction={['row']} spacing='24px'>
                            {data.map((r: Movie) =>
                                <Box
                                    className="movie-box"
                                >
                                    <MovieCard movie={r} />
                                </Box>
                            )}
                        </Stack>
                    </VStack>
                </>
            }
        </>
    );
}