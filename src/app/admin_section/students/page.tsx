"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowModel,
} from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AdminLayout from "@/components/layouts/admin";

const initialRows = [
  {
    id: 1,
    teacherId: "T001",
    name: "John Doe",
    age: 30,
    subject: "Mathematics",
    image: "",
    dob: "1994-01-15",
    appointmentLetter: "2018-06-01",
    ssnitId: "SSN123456",
    bankAccount: "1234567890",
    firstRankDate: "2020-01-10",
    contact: "0244000000",
  },
  {
    id: 2,
    teacherId: "T002",
    name: "Jane Smith",
    age: 28,
    subject: "English",
    image: "",
    dob: "1996-03-25",
    appointmentLetter: "2019-07-10",
    ssnitId: "SSN654321",
    bankAccount: "0987654321",
    firstRankDate: "2021-02-18",
    contact: "0551234567",
  },
];

export default function TeachersPage() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = React.useState<any>(null);

  const [newTeacher, setNewTeacher] = React.useState({
    teacherId: "",
    name: "",
    age: "",
    subject: "",
    image: "",
    dob: "",
    appointmentLetter: "",
    ssnitId: "",
    bankAccount: "",
    firstRankDate: "",
    contact: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTeacher({ ...newTeacher, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleAddTeacher = () => {
    const id = Math.floor(Math.random() * 100000);
    setRows((prev) => [
      ...prev,
      { id, ...newTeacher, age: Number(newTeacher.age) },
    ]);
    setNewTeacher({
      teacherId: "",
      name: "",
      age: "",
      subject: "",
      image: "",
      dob: "",
      appointmentLetter: "",
      ssnitId: "",
      bankAccount: "",
      firstRankDate: "",
      contact: "",
    });
    setAddModalOpen(false);
  };

  const handleViewClick = (id: GridRowId) => {
    const teacher = rows.find((t) => t.id === id);
    setSelectedTeacher(teacher);
    setDetailsModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "teacherId", headerName: "ID", width: 100, editable: true },
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "age",
      headerName: "Age",
      width: 80,
      editable: true,
      type: "number",
    },
    { field: "subject", headerName: "Subject", width: 180, editable: true },
    { field: "contact", headerName: "Contact", width: 140, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      getActions: ({ id }) => {
        const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;
        return isEditing
          ? [
              <GridActionsCellItem
                key={id}
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                key={id}
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(id)}
              />,
            ]
          : [
              <GridActionsCellItem
                key={id}
                icon={<VisibilityIcon />}
                label="View"
                onClick={() => handleViewClick(id)}
              />,
              <GridActionsCellItem
                key={id}
                icon={<EditIcon />}
                label="Edit"
                onClick={handleEditClick(id)}
              />,
              <GridActionsCellItem
                key={id}
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
              />,
            ];
      },
    },
  ];

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout page="Students">
      <div className="flex flex-1 flex-col bg-gray-100 p-4">
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded border px-3 py-2"
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddModalOpen(true)}
          >
            Add Teacher
          </Button>
        </div>

        <Box sx={{ width: "100%" }}>
          <DataGrid
            autoHeight
            rows={filteredRows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={setRowModesModel}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            disableRowSelectionOnClick
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />
        </Box>
      </div>

      {/* Add Teacher Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "48%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            m: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 className="mb-4 text-xl font-semibold">Add New Teacher</h2>

          <Grid container spacing={1}>
            <Grid  xs={12}>
              <TextField
                fullWidth
                label="Teacher ID"
                value={newTeacher.teacherId}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, teacherId: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={newTeacher.age}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, age: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Subject"
                value={newTeacher.subject}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, subject: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-2"
              />
            </Grid>

            {newTeacher.image && (
              <Grid item xs={12}>
                <img
                  src={newTeacher.image}
                  alt="Preview"
                  className="mb-2 h-24 w-24 object-cover rounded"
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={newTeacher.dob}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, dob: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Appointment Letter Date"
                type="date"
                value={newTeacher.appointmentLetter}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    appointmentLetter: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date of First Rank"
                type="date"
                value={newTeacher.firstRankDate}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    firstRankDate: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="SSNIT ID"
                value={newTeacher.ssnitId}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, ssnitId: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bank Account"
                value={newTeacher.bankAccount}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, bankAccount: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Contact"
                value={newTeacher.contact}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, contact: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleAddTeacher}>
                Add Teacher
              </Button>
              <Button
                variant="outlined"
                onClick={() => setAddModalOpen(false)}
                className="ml-2"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* View Teacher Modal */}
      <Modal open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            m: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 className="mb-4 text-xl font-semibold">Teacher Details</h2>
          {selectedTeacher ? (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Teacher ID"
                  value={selectedTeacher.teacherId}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={selectedTeacher.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Age"
                  value={selectedTeacher.age}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={selectedTeacher.subject}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact"
                  value={selectedTeacher.contact}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  value={selectedTeacher.dob}
                  InputProps={{
                    readOnly: true,
                  }}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Appointment Date"
                  value={selectedTeacher.appointmentLetter}
                  InputProps={{
                    readOnly: true,
                  }}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Rank Date"
                  value={selectedTeacher.firstRankDate}
                  InputProps={{
                    readOnly: true,
                  }}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="SSNIT ID"
                  value={selectedTeacher.ssnitId}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Account"
                  value={selectedTeacher.bankAccount}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {selectedTeacher.image && (
                <Grid item xs={12}>
                  <img
                    src={selectedTeacher.image}
                    alt="Teacher"
                    className="mb-2 h-24 w-24 object-cover rounded"
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => setDetailsModalOpen(false)}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          ) : (
            <p>Loading teacher details...</p>
          )}
        </Box>
      </Modal>
    </AdminLayout>
  );
}
