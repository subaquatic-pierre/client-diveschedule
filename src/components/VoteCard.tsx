import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        margin: '1rem 0'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}))

const QuestionCard = props => {
    const { id, title, subtitle, created, expires, choices } = props
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Question:
                </Typography>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {subtitle}
                </Typography>
                {choices.map((choice => (
                    <Typography key={choice.id} variant="body2" component="p">
                        {bull}{choice.title}
                    </Typography>
                )))}
            </CardContent>
            <CardActions>
                <Button href={`/question/${id}`} size="small">Make Your Vote</Button>
            </CardActions>
        </Card>
    )
}

export default QuestionCard;