<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Announcement Application</title>

		<!-- CSS -->

			<?php echo $link; ?>

		<!-- CSS -->

	</head>

	<!-- BODY -->
	<body>

		<div>

			<!-- navigation header -->
			<?php echo $header; ?>

			<!-- navigation header -->

			<div class="body">

				<div class="container-fluid"
						>

					<div class="row">
						<div class="container"
								style="/*margin: 10px 100px 10px 100px*/"
								>
							<div class="card card-primary">

								<div class="card-header">
									<h2>
										<!-- Announcements -->
										<?php echo lang( 'ann_announcements' ) ?>
									</h2>
								</div>

								<div class="card-body">

									<table id="tblAnnncmnts">
									</table>

								</div>

								<div class="card-footer">
									<button type="button"
											class="btn btn-info btn-md btnModal"
											id="btnModal"
											data-toggle="modal"
											data-target="#mdlForm"
											>
										<!-- Add -->
										<?php echo lang( 'btn_add' ) ?>
									</button>
									<!--
									<button type="button"
											class="btn btn-info btn-md"
											data-toggle="modal"
											data-target="#mdlAddAnnoncement"
											>
										Edit
									</button>
									-->
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>

		</div>

	<!-- MODAL -->

		<!-- Trigger the modal with a button -->

		<div id="mdlForm" class="modal fade" role="dialog">
			<div class="modal-dialog modal-lg">

				<div class="modal-content">
					<div class="modal-header">
						<button type="button"
								class="close"
								data-dismiss="modal"
								>
							&times;
						</button>
						<h2 class="modal-title">
							<!-- Announcements -->
							<?php echo lang( 'ann_announcements' ) ?>
						</h2>
					</div>
					<div class="modal-body">
						<div class="">
						<?php echo $form_open; ?>
							<div class="card card-default">

								<!-- <div class="card-heading"></div> -->

								<div class="card-body">

									<div class="form-group required">
										<label for="strAnnouncementTitle"
												class="control-label"
												>
											<!-- Title -->
											<?php echo lang( 'ann_title' ) ?>
										</label>
										<input type="text"
												class="form-control"
												id="strAnnouncementTitle"
												name="strAnnouncementTitle"
												placeholder="<?php echo lang( 'announcement_title' ) ?>"
												required="true"
												value=""
												>
									</div>

									<div class="col-sm-12">
										<div class="col-sm-6 form-group required">
											<label for="dtmAnnouncementDate"
													class="control-label"
													>
												<!-- Date -->
												<?php echo lang( 'ann_date' ) ?>
											</label>
											<input type="text"
													class="form-control date"
													id="dtmAnnouncementDate"
													name="dtmAnnouncementDate"
													placeholder="Announcement Date"
													required="true"
													value=""
													>
										</div>

										<div class="col-sm-6 form-group required">
											<div class="col-sm-12">
												<input type="checkbox"
														class=""
														id="blnIsSpecial"
														name="blnIsSpecial"
														value="1"
														>
												<label for="blnIsSpecial">
													<!-- Special -->
													<?php echo lang( 'ann_special' ) ?>
												</label>

												<input type="checkbox"
														class=""
														id="blnIsUrgent"
														name="blnIsUrgent"
														value="1"
														>
												<label for="blnIsUrgent">
													<!-- Urgent -->
													<?php echo lang( 'ann_urgent' ) ?>
												</label>
											</div>
										</div>
									</div>

									<div class="form-group required">
										<label for="txtAnnouncementDescription"
												class="control-label"
												>
											<!-- Details -->
											<?php echo lang( 'ann_details' ) ?>
										</label>
										<!-- <textarea class="form-control"
													id="txtAnnouncementDetails"
													name="txtAnnouncementDetails"
													placeholder="Announcement Details"
													required="true"
													value=""
													cols="30"
													rows="10"
													></textarea> -->
										<div class="container-fluid">
											<div class="" style="width: 720px; height: 300px; padding: 20px"
													id="txtAnnouncementDescription"
													></div>
										</div>
									</div>

								</div>

								<!-- <div class="card-footer"> -->

								<!-- </div> -->

							</div>
						</div>
					</div>
					<div class="modal-footer">
						<div class="btn btn-group float-left">
							<button type="submit"
									class="btn btn-primary"
									id="btnSubmitAnnouncements"
									name="btnSubmit"
									>
								<!-- Save -->
								<?php echo lang( 'btn_save' ) ?>
							</button>
						<?php echo $form_close; ?>
							<button type="button"
									class="btn btn-default "
									data-dismiss="modal"
									>
								<!-- Close -->
								<?php echo lang( 'btn_close' ) ?>
							</button>
						</div>
					</div>
				</div>
				<!-- <div id="window" style="width: 1500px; height:200px; padding: 10px;">

			    </div> -->
			</div>
		</div>

	<!-- MODAL -->

	<!-- footer -->

	<?php echo $footer; ?>

	<!-- footer -->

	<!-- JAVASCRIPTS -->

	<?php echo $script; ?>

	<!-- JAVASCRIPTS -->

	<script>
		// (
		// 	function () {
		// 		// session.check_session( 'announcements' );
		// 	}
		// )();
	</script>

	</body>
	<!-- BODY -->

</html>
