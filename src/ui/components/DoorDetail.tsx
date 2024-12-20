import Typography from '@mui/material/Typography';
import { Door } from '@/models/Door';
import { DetailPageContainer } from '@/ui/layout/DetailPageContainer';
import { DetailPageItem } from '@/ui/layout/DetailPageItem';
import { ConnectionStatus } from '../../models/ConnectionStatus';

interface DoorDetailProps {
  door: Door;
}

export function DoorDetail({ door }: DoorDetailProps) {
  return (
    <DetailPageContainer>
      <DetailPageItem label="ID">
        <Typography>{door.id}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Building">
        <Typography>{door.buildingName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Apartment">
        <Typography>{door.apartmentName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection type">
        <Typography>{door.connectionType}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection status">
        {door.connectionStatus === ConnectionStatus.Offline ? (
          <Typography color="error.main">{ConnectionStatus.Offline}</Typography>
        ) : (
          <Typography color="success.main">
            {ConnectionStatus.Online}
          </Typography>
        )}
      </DetailPageItem>
      <DetailPageItem label="Last connection status update">
        <Typography>
          {new Date(door.lastConnectionStatusUpdate).toLocaleString('sk')}
        </Typography>
      </DetailPageItem>
    </DetailPageContainer>
  );
}
