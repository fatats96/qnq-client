import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { Movie } from '../interfaces/movie';
import { AxiosInstance } from '../common/http-wrapper';

export default function MovieDetail() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Movie>();

    useEffect(() => {
        AxiosInstance
            .get(`/Movie/GetMovie?id=${id}`)
            .then(res => setData(res.data));
        console.log(id);
    }, []);

    useEffect(() => {
        
    }, [id])

    return <Container maxW={'7xl'}>
        <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex>
                <Image
                    rounded={'md'}
                    alt={'product image'}
                    src={
                        "https://www.themoviedb.org/t/p/w220_and_h330_face" + data?.posterPath
                    }
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={{ base: '100%', sm: '400px', lg: '500px' }}
                />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={'header'}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                        {data?.title}
                    </Heading>
                    <Text
                        color={useColorModeValue('gray.900', 'gray.400')}
                        fontWeight={300}
                        fontSize={'2xl'}>
                        {data?.releaseDate}
                    </Text>
                </Box>

                <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                        <StackDivider
                            borderColor={useColorModeValue('gray.200', 'gray.600')}
                        />
                    }>
                    <VStack spacing={{ base: 4, sm: 6 }}>
                        <Text fontSize={'lg'}>
                            {data?.overview}
                        </Text>
                    </VStack>
                    <Box>
                        <Text
                            fontSize={{ base: '16px', lg: '18px' }}
                            color={useColorModeValue('yellow.500', 'yellow.300')}
                            fontWeight={'500'}
                            textTransform={'uppercase'}
                            mb={'4'}>
                            Features
                        </Text>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            <List spacing={2}>
                                <ListItem>Adult</ListItem>
                                <ListItem>Original Language</ListItem>{' '}
                            </List>
                            <List spacing={2}>
                                <ListItem>{data?.adult ? 'No' : 'Yes'}</ListItem>
                                <ListItem>{data?.originalLanguage}</ListItem>
                            </List>
                        </SimpleGrid>
                    </Box>
                    <Box>
                        <Text
                            fontSize={{ base: '16px', lg: '18px' }}
                            color={useColorModeValue('yellow.500', 'yellow.300')}
                            fontWeight={'500'}
                            textTransform={'uppercase'}
                            mb={'4'}>
                            Genres
                        </Text>

                        <List spacing={2}>
                            {data?.genres.map(x => {
                                return <ListItem>
                                    <Text as={'span'} fontWeight={'bold'}>
                                        {x.name}
                                    </Text>
                                </ListItem>
                            })}
                        </List>
                    </Box>
                </Stack>
            </Stack>
        </SimpleGrid>
    </Container>
}