import { Box, BoxProps, useColorModeValue, Flex, CloseButton, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiCompass, FiHome, FiSettings, FiStar, FiTrendingUp } from "react-icons/fi";
import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
    onClose: () => void;
}
interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, link: '/' },
    { name: 'Trending', icon: FiTrendingUp, link: '/trending' },
    { name: 'Explore', icon: FiCompass, link: '/explore' },
    { name: 'Favourites', icon: FiStar, link: '/favourites' },
    { name: 'Settings', icon: FiSettings, link: '/settings' },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} link={link.link}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

export default SidebarContent;