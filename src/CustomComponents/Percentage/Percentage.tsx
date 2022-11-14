import React from 'react'
import './styles.scss'

const Percentage = ({ value, normal }: { value: number; normal: boolean }) => (
    <span className="percentageContainer">
        <span
            className={`percentageContainerFill${normal ? ' percentageNormal' : ' percentageWrong'}`}
            style={{ width: value + '%' }}
        ></span>
        <span className="percentageContainerValue">{value}%</span>
    </span>
)

export default Percentage
