import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Door } from '@/models/Door';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { ConnectionStatus } from '../../models/ConnectionStatus';

interface DoorListProps {
  doors: Door[];
}

const columns: GridColDef<Door>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'buildingName',
    headerName: 'Building',
    flex: 1,
  },
  {
    field: 'apartmentName',
    headerName: 'Apartment',
    flex: 1,
  },
  {
    field: 'connectionType',
    headerName: 'Connection type',
    flex: 1,
  },
  {
    field: 'connectionStatus',
    headerName: 'Connection status',
    flex: 1,
    renderCell: (content) => {
      if (content.row.connectionStatus === ConnectionStatus.Offline) {
        return (
          <Typography component="span" color="error.main">
            {ConnectionStatus.Offline}
          </Typography>
        );
      }

      return (
        <Typography component="span" color="success.main">
          {ConnectionStatus.Online}
        </Typography>
      );
    },
  },
  {
    field: 'lastConnectionStatusUpdate',
    headerName: 'Last connection status update',
    flex: 2,

    renderCell: (content) => {
      return (
        <Typography component="span">
          {new Date(content.row.lastConnectionStatusUpdate).toLocaleString(
            'sk',
          )}
        </Typography>
      );
    },
  },
];

export function DoorList({ doors }: DoorListProps) {
  const router = useRouter();

  const onDoorRowClick = useCallback(
    (gridRow: GridRowParams<Door>) => {
      router.push({
        pathname: '/doors/[doorId]',
        query: { doorId: gridRow.id },
      });
    },
    [router],
  );

  return (
    <DataGrid
      hideFooter
      rows={doors}
      columns={columns}
      disableRowSelectionOnClick
      onRowClick={onDoorRowClick}
    />
  );
}
