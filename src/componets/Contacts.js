import React from 'react'
import PropTypes from 'prop-types'
export const Contacts = (props) => {
  const { contacts, handleDeleteItem } = props
  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map((contact) => {
          return (
            <li key={contact.id}>
              {contact.name}: {contact.number}{' '}
              <button
                onClick={() => {
                  handleDeleteItem(contact.id)
                }}
              >
                delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
}
