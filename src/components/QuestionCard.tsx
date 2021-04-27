import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography
} from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router'
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core';

const DELETE_QUESTION = gql`
    mutation DeleteQuestion($questionId:String!) {
        deleteQuestion(questionId:$questionId){
            question {
                id
            }
        }
    }
`

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
    const { id, title, subtitle, choices, isStaff } = props
    const [deleteQuestion] = useMutation(DELETE_QUESTION)
    const history = useHistory()
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>;
    const username = localStorage.getItem('token')

    const handleDeleteClick = (question_id) => {
        deleteQuestion({ variables: { questionId: question_id } })
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const handleMakeVoteClick = (id) => {
        if (!username) {
            history.push('/login')
        } else {
            history.push(`/question/${id}`)
        }
    }

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
                {choices && choices.map((choice => (
                    <Typography key={choice.id} variant="body2" component="p">
                        {bull}{choice.title}
                    </Typography>
                )))}
            </CardContent>
            <CardActions>
                <Button onClick={() => handleMakeVoteClick(id)} variant='contained' color='primary' size="small">Make Your Vote</Button>
                {isStaff &&
                    <Button onClick={() => handleDeleteClick(id)} variant='contained' size="small">Delete Question</Button>
                }
            </CardActions>
        </Card>
    )
}

export default QuestionCard;