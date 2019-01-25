<?php function temp_table($country, $rows = 10) { ?>
<table class="temp-table <?php echo $country ?>">
    <tr1>
        <th>Nr.</th>
        <th>Place</th>
        <th>Feeling Temperature</th>
    </tr1>
    <?php for ($i = 0; $i < $rows; $i++) { ?>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <?php } ?>

</table>
<?php } ?>

