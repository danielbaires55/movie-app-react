
import { MediaType } from "../types/movieTypes";
import { getMediaImage } from "../functions/functions";
import { Card, Image, Box, Text, Button } from "@chakra-ui/react";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type MovieCardProps = {
  item: MediaType;
};

export const MovieCard = ({ item }: MovieCardProps) => {
  const imageUrl = getMediaImage(item);

  return (
    <DialogRoot>
      {/* Card */}
      <DialogTrigger asChild>
        <Card.Root
          className="card"
          cursor="pointer"
          width="320px"
          height="480px"
          borderRadius="lg"
          boxShadow="xl"
          transition={'all 0.2s ease-in-out'}
          border={'none'}
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "2xl",
          }}
          overflow="hidden"
        >
          <Box position="relative" width="100%" height="100%" border={'none'}>
            <Image
              src={imageUrl as string}
              alt={item.title || item.name}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
        </Card.Root>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent
        maxWidth={'70%'}
        borderRadius="lg"
        maxHeight={1200}
        overflow="hidden"
      >
        {/* Modal Header with Title */}
        <DialogHeader>
          <DialogTitle fontSize="2xl" textAlign="center" mb={4}>
            {item.media_type === "movie" ? item.title : item.name}
          </DialogTitle>
        </DialogHeader>

        {/* Modal Body with Image and Details */}
        <DialogBody>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={6}
          >
            <Box flex="1" width="100%" height="100%">
              <Image
                src={imageUrl as string}
                alt={item.title || item.name}
                objectFit="contain"  
                borderRadius="lg"
                width="100%"       
                height="500px"     
                maxHeight="600px"  
                overflow="hidden"
              />
            </Box>

            <Box flex="1" display="flex" flexDirection="column" gap={4}>
              {/* Dettagli del media */}
              {item.media_type === "movie" && (
                <Text fontSize="md" fontFamily="sans-serif">
                  {item.overview || "N/A"}
                </Text>
              )}
              {item.media_type === "tv" && (
                <Text fontSize="md" fontFamily="sans-serif">
                  {item.overview || "N/A"}
                </Text>
              )}
              {item.media_type === "person" && (
                <Text fontSize="md" fontFamily="sans-serif">
                  Known for: {item.known_for_department || "N/A"}
                </Text>
              )}

              {/* Dettagli comuni */}
              <Text fontSize="md" fontFamily="sans-serif">
                Vote Average: {item.vote_average || "N/A"}
              </Text>
              <Text fontSize="md" fontFamily="sans-serif">
                Popularity: {item.popularity || "N/A"}
              </Text>
            </Box>
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
