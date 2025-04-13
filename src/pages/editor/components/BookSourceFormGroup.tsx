const BookSourceFormGroup = () => {
  return (
    <div className="w-full">
      {/* <div className="divider"></div> */}

      <fieldset className="fieldset p-4 ml-2 mr-2 mb-2">
        {/* <legend className="fieldset-legend mb-1">Page details</legend> */}
        <div className="divider divider-start fieldset-legend mb-1">
          Page details
        </div>

        <label className="fieldset-label">Title</label>
        <input
          type="text"
          className="input w-full"
          placeholder="My awesome page"
        />

        <label className="fieldset-label">Slug</label>
        <input
          type="text"
          className="input w-full"
          placeholder="my-awesome-page"
        />

        <label className="fieldset-label">Author</label>
        <input type="text" className="input w-full" placeholder="Name" />
      </fieldset>
    </div>
  )
}

export default BookSourceFormGroup
