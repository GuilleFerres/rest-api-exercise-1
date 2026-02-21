import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { EpisodeEntityVm } from '../episode-collection.vm';
import * as api from '../api';
import { mapFromApiToVm } from '../episode-collection.mapper';

interface Props {
  episodeUrl: string
}

export const EpisodeCard: React.FunctionComponent<Props> = (props) => {
  const { episodeUrl } = props;

   const [episodeData, setEpisodeData] = React.useState<EpisodeEntityVm>({} as EpisodeEntityVm);

  const handleLoadEpisodeData = async (episodeUrl: string) => {
    try {
      const episode: EpisodeEntityVm = await api.getEpisode(episodeUrl);
      setEpisodeData(mapFromApiToVm(episode));
      return episode;
    } catch (error) {
      console.error('Error loading episode data:', error);
      return 'Unknown Episode';
    }
  };

  React.useEffect(() => {
      if (episodeUrl) {
        handleLoadEpisodeData(episodeUrl);
      }
  }, []);

  return (
    <Card>
      <CardHeader title={episodeData.name} subheader={`Air date: ${episodeData.air_date}`} />
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Episode code: {episodeData.episode}
        </Typography>
      </CardContent>
    </Card>
  );
};
