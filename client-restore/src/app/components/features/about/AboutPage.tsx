import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTitle } from "../../../hooks/useTitle";
import { Apis } from "../../../api/Apis";
import { useState } from "react";

type Props = {};

export default function AboutPage({}: Props) {
  useTitle("About");

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationErrors = () => {
    Apis.TestError.getValidationError()
    .then(() => console.log("should not see this"))
    .catch(error => setValidationErrors(error));
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2">Error for testing purposes</Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="outlined"
          onClick={() =>
            Apis.TestError.get400Error().catch((error) => console.log(error))
          }
        >
          TestError 400
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            Apis.TestError.get401Error().catch((error) => console.log(error))
          }
        >
          TestError 401
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            Apis.TestError.get404Error().catch((error) => console.log(error))
          }
        >
          TestError 404
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            Apis.TestError.get500Error().catch((error) => console.log(error))
          }
        >
          TestError 500
        </Button>
        <Button
          variant="outlined"
          onClick={getValidationErrors}
        >
          TestError ValidationError
        </Button>
      </ButtonGroup>

      {validationErrors.length > 0 &&
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map(error => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert> 
      }
      
    </Container>
  );
}
