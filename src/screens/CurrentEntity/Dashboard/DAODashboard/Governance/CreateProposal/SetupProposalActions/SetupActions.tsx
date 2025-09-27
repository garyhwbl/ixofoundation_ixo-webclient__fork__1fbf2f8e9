import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from 'screens/CreateEntity/Components'
import React, { useMemo } from 'react'
import { SetupActionsForm } from './SetupActionsForm'
import { useNavigate, useParams } from 'react-router-dom'

const SetupActions: React.FC = () => {
  const navigate = useNavigate()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const { proposal, updateProposal } = useCreateEntityState()

  const actions = useMemo(() => proposal?.actions ?? [], [proposal])
  const validActions = useMemo(() => actions.filter((item) => item.data), [actions])

  const handleBack = () => {
    navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/info`)
  }
  const handleContinue = () => {
    navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/page`)
  }

  return (
    <FlexBox width={'100%'} $direction='column' $gap={15} $justifyContent='center'>
      <Typography variant='secondary' size='2xl'>
        {validActions.length === 0
          ? 'No actions will be executed when the proposal passes.'
          : `The following ${validActions.length} action${validActions.length === 1 ? '' : 's'} get executed when the proposal passes.`}
      </Typography>

      <SetupActionsForm actions={actions} setActions={(actions) => updateProposal({ ...proposal, actions })} />

      <FlexBox width='100%' $justifyContent='flex-start' $gap={4}>
        <Button variant='secondary' onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupActions
