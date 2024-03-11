import Typography from "@mui/material/Typography";
import NavBarLayout from "../components/navigation/NavBarLayout";

type Props = {
    children?: React.ReactNode;
};

export const PageLayout: React.FC<Props> = ({children}) => {
    return (
        <>
            <NavBarLayout />
            <Typography variant="h5" align="center">Korv i mängder</Typography>
            <br/>
            <br/>
            {children}
        </>
    );
};