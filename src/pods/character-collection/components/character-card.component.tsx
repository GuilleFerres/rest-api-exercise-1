import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CharacterEntityVm } from '../character-collection.vm';
import * as classes from './character-card.styles';
import Button from '@mui/material/Button';

interface Props {
  character: CharacterEntityVm;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

export const CharacterCard: React.FunctionComponent<Props> = (props) => {
  const { character, onSelect, onDelete } = props;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="Character">{character.image}</Avatar>}
        title={character.name}
        subheader={character.status}
      />
      <CardContent>
        <div className={classes.content}>
          <CardMedia
            image={character.image}
            title={character.name}
            style={{ height: 0, paddingTop: '56.25%' }}
          />
          <Typography variant="subtitle1" gutterBottom>
            {character.species}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={() => onSelect(character.id)} style={{ cursor: 'pointer' }}>
          View character
        </Button>
        <IconButton onClick={() => onDelete(character.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
